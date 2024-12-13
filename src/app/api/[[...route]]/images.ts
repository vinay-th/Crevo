import { Hono } from 'hono';
import { unsplash } from '@/lib/unsplash';
import { verifyAuth } from '@hono/auth-js';

const DEFAULT_COUNT = 50;
const DEFAULT_COLLECTION_IDS = ['317099'];
const IMGBB_API_KEY = process.env.IMGBB_API_KEY;
const BRIA_API_TOKEN = process.env.BRIA_API_TOKEN;

const app = new Hono()
  .get('/', verifyAuth(), async (c) => {
    const images = await unsplash.photos.getRandom({
      collectionIds: DEFAULT_COLLECTION_IDS,
      count: DEFAULT_COUNT,
    });

    if (images.errors) {
      return c.json({ error: 'Something went wrong' }, 400);
    }

    let response = images.response;

    if (!Array.isArray(response)) {
      response = [response];
    }

    return c.json({ data: response });
  })
  .post('/upload-to-imgg', verifyAuth(), async (c) => {
    try {
      // Retrieve the Base64 image string from the request body
      const { imageBase64 } = await c.req.json();

      if (!imageBase64) {
        return c.json({ error: 'Image data is required' }, 400);
      }

      // Send the Base64 image data to imgbb
      const imgBBResponse = await fetch(
        `https://api.imgbb.com/1/upload?expiration=600&key=${IMGBB_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({ image: imageBase64 }),
        }
      );

      if (!imgBBResponse.ok) {
        const errorResponse = await imgBBResponse.json();
        return c.json({ error: errorResponse.error.message }, 400);
      }

      const result = await imgBBResponse.json();
      return c.json({ data: result }, 200);
    } catch (error) {
      console.error('Error uploading image:', error);
      return c.json({ error: 'Internal server error' }, 500);
    }
  })
  .post('/remove-bg', verifyAuth(), async (c) => {
    try {
      // Retrieve the url of the image from the request body
      const { image } = await c.req.json();

      if (image) {
        const removeBgResponse = await fetch(
          `https://engine.prod.bria-api.com/v1/background/remove`,
          {
            method: 'POST',
            headers: new Headers({
              'Content-Type': 'application/x-www-form-urlencoded',
              api_token: BRIA_API_TOKEN || '',
            }),
            body: new URLSearchParams({
              image_url: image,
            }),
          }
        );
        if (!removeBgResponse.ok) {
          const errorResponse = await removeBgResponse.json();
          console.error('Error removing background:', errorResponse);
          return c.json(
            { error: errorResponse.error || 'Background removal failed' },
            400
          );
        }

        const responseData = await removeBgResponse.json();

        return c.json({ success: true, data: responseData });
      }
    } catch (error) {
      console.error('Error removing background:', error);
      return c.json({ error: 'Internal server error' }, 500);
    }
  });

export default app;
