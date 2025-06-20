// src/signalr/notificationHub.ts
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

const HUB_URL = `${process.env.NEXT_PUBLIC_BASE_API_URL}/notifications`;

export const createNotificationHubConnection = (): HubConnection => {
  return new HubConnectionBuilder()
      .withUrl(HUB_URL, {
        // if your API needs credentials/cookies:
        // withCredentials: true
      })
      .withAutomaticReconnect([0, 2000, 10_000]) // immediate, 2s, 10s retries
      .configureLogging(LogLevel.Information)
      .build();
}
