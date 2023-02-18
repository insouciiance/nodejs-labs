function generateHashtag (str) {
  if (!str.trim())
    return false

  const hashtag = generateHashtagInternal(str);
  return hashtag.length > 140 ? false : hashtag

  function generateHashtagInternal() {
    const words = str.split(" ");
    return "#" + words.reduce((acc, x) => acc + capitalize(x), "");
  }

  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}

console.log(generateHashtag("Hello there          thanks for trying my Kata"));
