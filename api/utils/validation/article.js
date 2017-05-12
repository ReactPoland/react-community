import { Plain, Raw } from 'slate';

export const checkArticleBody = ({previewSize, title, content, type, link, description }) => {
  if (!( previewSize instanceof Array && previewSize.length > 1)) throw new Error('property previewSize is invalid');
  let [sizeItem1, sizeItem2] = previewSize;
  sizeItem1 = parseInt(sizeItem1, 10);
  sizeItem2 = parseInt(sizeItem2, 10);
  if ( isNaN(sizeItem1) || isNaN(sizeItem2) ) throw new Error('property previewSize is invalid');

  const article = {
    previewSize: [sizeItem1, sizeItem2],
    title,
    description,
    type
  };

  if (article.type === 'external') article.link = link;
  else {
    if (typeof content !== 'object') throw new Error('property content is invalid');
    article.content = content;

    if (content && content.length) {
      let plainText = '';
      try {
        const parsedJson = JSON.parse(content);
        plainText = Plain.serialize(Raw.deserialize(parsedJson));
      } catch (err) { }
      article.plainText = plainText;
    }
  }

  return article;
};
