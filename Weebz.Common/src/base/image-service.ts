import { getEnvironment } from '../base/env-factory';
import { HttpClientService } from './http-client';

let imgApiService = new HttpClientService();

imgApiService
  .configure(c => c
    .useStandardConfiguration()
    .rejectErrorResponses()
  );

class ImageService {
  private __env = getEnvironment();

  getImageUrl(imagePath: string): string {
    if (!imagePath)
      return null;

    return `${this.__env.storeUrl}${imagePath.replace('\\', '/')}`;
  }

  cacheImages(images: string[]) {
    let i = -1;
    let img;

    let loadNext = () => {
      i++;

      if (i > images.length - 1) {
        if (img)
          img.remove();

        return;
      }

      let src = this.getImageUrl(images[i]);

      if (!img) {
        img = document.createElement('img');
        img.onload = () => loadNext();
        img.onerror = () => loadNext();
      }

      img.src = src;
    }

    loadNext();
  }
}

export default new ImageService();
