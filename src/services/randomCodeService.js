import { AUTH_CONFIG } from '../config/auth';

class RandomCodeService {
  constructor() {
    this.baseURL = AUTH_CONFIG.API_BASE_URL;
    this.supportedDifficulties = ['beginner', 'intermediate', 'advanced'];
  }

  async getRandomCode(options = {}) {
    const {
      difficulty: initialDifficulty = 'intermediate',
      language = 'python',
      minLength = 50,
      maxLength = 2000,
    } = options;

    // Validate difficulty level
    let difficulty = initialDifficulty;
    if (!this.supportedDifficulties.includes(difficulty)) {
      // eslint-disable-next-line no-console
      console.warn(`Invalid difficulty: ${difficulty}. Using 'intermediate' instead.`);
      difficulty = 'intermediate';
    }

    try {
      const queryParams = new URLSearchParams({
        difficulty,
        language,
        min_length: minLength.toString(),
        max_length: maxLength.toString(),
      });

      const response = await fetch(`${this.baseURL}/code/random?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Return the code object with all properties
      return {
        code: data.code,
        language: data.language,
        difficulty: data.difficulty,
        source: data.source,
        id: data.id,
        length: data.length,
      };
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching random code:', error);
      return null;
    }
  }

  getSupportedDifficulties() {
    return [...this.supportedDifficulties];
  }
}

export default new RandomCodeService();
