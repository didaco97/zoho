export interface ApiResponse {
  choices: Array<{
    message: {
      content: string;
      references?: Reference[];
      images?: Image[];
      function_call?: {
        name: string;
        arguments: string;
      };
    };
  }>;
}

export interface Reference {
  title: string;
  url: string;
  snippet: string;
}

export interface Image {
  url: string;
  alt: string;
}

export interface GroundwaterData {
  location: string;
  dataType: 'water_level' | 'quality' | 'recharge_rate';
}