import {useEffect, useState} from "react";
import {CardMedia, Skeleton} from '@mui/material';
import {useImageSize} from 'react-image-size';

import {BookType} from "../type";
import coverUnavailable from '../asset/cover-unavailable.jpg';

const BookImageBlock = ({
  book,
  width,
  height,
}: {
  book: BookType,
  width?: number | string,
  height?: number | string,
}) => {
  // Get it from OpenLibrary API
  const img = `https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`;

  const [image, setImage] = useState<string | undefined>(undefined);

  const [dimensions, {loading, error}] = useImageSize(img);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (error || !dimensions) {
      setImage(coverUnavailable);

      return;
    }

    /* OpenLibrary API will return a 1x1 image if the cover is not available */

    if (
      dimensions.width == 1
      && dimensions.height == 1
    ) {
      setImage(coverUnavailable);

      return
    }

    setImage(img);
  }, [dimensions]);

  if (loading) {
    return <Skeleton
      variant="rectangular"
      width={width}
      height={height}
    />
  }

  return <CardMedia
    component="img"
    sx={{
      width: width ?? 220 * 180 / 268, // 180/268 is the aspect ratio of the image
      height: height ?? 220,
      display: {xs: 'none', sm: 'block'}
    }}
    image={image}
    alt={book.title}
  />
};

export {
  BookImageBlock
}
