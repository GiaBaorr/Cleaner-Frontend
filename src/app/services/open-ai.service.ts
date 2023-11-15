import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OpenAIService {
  //completion.choices[0].message.content
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = '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';

  constructor(private http: HttpClient) {}

  generateText(prompt: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    });

    let messages = [];
    messages.push({ role: 'system', content: 'You are a helpful assistant.' });
    messages.push({
      role: 'user',
      content: `Check the following prompt contains sensitive content and return true or false, prompt : ${prompt}`,
    });

    const data = {
      messages: messages,
      model: 'gpt-3.5-turbo',
    };

    return this.http.post(`${this.apiUrl}`, data, { headers });
  }
}
