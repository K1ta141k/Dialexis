import { AUTH_CONFIG } from '../config/auth';

class RandomTextService {
  constructor() {
    this.baseURL = AUTH_CONFIG.API_BASE_URL;
  }

  async getRandomText(options = {}) {
    const {
      minLength = 100,
    } = options;

    try {
      const queryParams = new URLSearchParams({
        min_length: minLength.toString(),
      });

      const response = await fetch(`${this.baseURL}/random-text/random?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Return the text directly from the response
      return data.text || null;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching random text:', error);
      return null;
    }
  }
}

export default new RandomTextService();
