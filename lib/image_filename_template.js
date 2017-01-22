function imageFilenameTemplate(pattern, imageUrl) {
  const base = pattern.replace("%gid%", imageUrl.garellyId).replace("%id%", imageUrl.id.toString());
  return base + "." + imageUrl.ext;
}
