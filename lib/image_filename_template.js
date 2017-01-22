function imageFilenameTemplate(pattern, imageUrl) {
  const base = pattern.replace("%gid%", imageUrl.garellyId).replace("%id%", "000" + imageUrl.id.toString());
  return base + "." + imageUrl.ext;
}
