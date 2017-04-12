import serverResp from '../serverResp';
import { Plain, Raw } from 'slate';

export const checkArticleBody = ({previewSize, title, content }) => {
  if (!( previewSize instanceof Array )) throw serverResp.error('property previewSize is invalid');
  let [sizeItem1, sizeItem2] = previewSize;
  sizeItem1 = parseInt(sizeItem1, 10);
  sizeItem2 = parseInt(sizeItem2, 10);
  if ( isNaN(sizeItem1) || isNaN(sizeItem2) ) throw serverResp.error('property previewSize is invalid');

  const article = {
    previewSize: [sizeItem1, sizeItem2],
    title,
    content
  };

  if (content && content.length) {
    let plainText = '';
    try {
      const parsedJson = JSON.parse(content);
      plainText = Plain.serialize(Raw.deserialize(parsedJson));
    } catch (err) { }
    article.plainText = plainText;
  }

  return article;
};