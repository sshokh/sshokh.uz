const resolveImage = async (image, id = null) => {
  if (!image) {
    // no asset hash — fetch the app's icon hash from RPC endpoint
    if (!id) return null;

    try {
      const res = await fetch(
        `https://discord.com/api/v10/applications/${id}/rpc`,
      );
      if (!res.ok) return null;
      const data = await res.json();
      return data.icon
        ? `https://cdn.discordapp.com/app-icons/${id}/${data.icon}.png?size=4096`
        : null;
    } catch {
      return null;
    }
  }

  if (typeof image !== "string") return null;

  if (image.startsWith("mp:external/")) {
    return image.replace(
      "mp:external/",
      "https://media.discordapp.net/external/",
    );
  }

  if (image.startsWith("spotify:")) {
    return `https://i.scdn.co/image/${image.replace("spotify:", "")}`;
  }

  if (!id) return null;

  return /^\d+$/.test(image)
    ? `https://cdn.discordapp.com/app-assets/${id}/${image}.png?size=4096`
    : `https://cdn.discordapp.com/app-icons/${id}/${image}.png?size=4096&keep_aspect_ratio=false`;
};

export default resolveImage;
