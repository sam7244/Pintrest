import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: "3pzs1pfs",
  dataset: "production",
  apiVersion: "2021-11-16",
  useCdn: true,
  token:
    "skFGcfp2R7NJoMNxGf7TYyOLMPk4vZcXrPBgFmFWzsNclCGIxzqf25Lyw3O9rBNEHKNkBfCnEq7VHGEhcwjKipXdsSUX29XaI73gFp3MfPvrK0LYO8xSu1vHV48VQcpITXChru0abchoqWRZM1AmcK2sZewru4Y0CFRk1QwB4pXz5KQqkGL6",
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
