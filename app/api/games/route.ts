import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const gameName = searchParams.get("name");

    if (!gameName) {
      return NextResponse.json(
        { error: "Missing game name" },
        { status: 400 }
      );
    }

    const tokenResponse = await fetch(
      `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
      {
        method: "POST",
      }
    );

    if (!tokenResponse.ok) {
      throw new Error("Failed to get Twitch token");
    }

    const tokenData = await tokenResponse.json();

    const igdbResponse = await fetch(
      "https://api.igdb.com/v4/games",
      {
        method: "POST",
        headers: {
          "Client-ID": process.env.TWITCH_CLIENT_ID!,
          Authorization: `Bearer ${tokenData.access_token}`,
        },
        body: `
          search "${gameName}";
          fields
            name,
            summary,
            cover.image_id,
            artworks.image_id;
          limit 10;
        `,
      }
    );

    if (!igdbResponse.ok) {
      console.log("STATUS:", igdbResponse.status);

      const errorText = await igdbResponse.text();

      console.log("ERROR:", errorText);

      return NextResponse.json(
        { error: errorText },
        { status: igdbResponse.status }
      );
    }

    const data = await igdbResponse.json();

    // Debug output
    console.log("=================================");
    console.log("GAME SEARCH:", gameName);

    console.log(
      "MATCHES:",
      data.map((game: any) => game.name)
    );

    console.log(
      "FULL RESULT:",
      JSON.stringify(data, null, 2)
    );

    console.log("=================================");

    return NextResponse.json(data);
  } catch (error) {
    console.error("IGDB API ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch game data",
      },
      {
        status: 500,
      }
    );
  }
}