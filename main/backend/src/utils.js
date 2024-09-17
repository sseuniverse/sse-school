exports.JWT_SECRET = "sseworld";
exports.JWT_EXPIRES_IN = "2d";

exports.titleToSlug = async function (title, Article) {
  let slug = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

  let count = 0;
  let originalSlug = slug;

  while (await Article.exists({ slug })) {
    count++;
    slug = `${originalSlug}-${count}`;
  }

  return slug;
};
