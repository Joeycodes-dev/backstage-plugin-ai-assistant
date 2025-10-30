import { createApiRef } from '@backstage/core-plugin-api';
import { DiscoveryApi, FetchApi } from '@backstage/core-plugin-api';
import {
  Conversation,
  Message,
} from '@sweetoburrito/backstage-plugin-ai-assistant-common';

type SendMessageOptions = {
  conversationId?: string;
  modelId: string;
  messages: Message[];
  stream?: boolean;
};

export type ChatApi = {
  getModels: () => Promise<string[]>;
  getConversation: (id?: string) => Promise<Message[]>;
  sendMessage: (options: SendMessageOptions) => Promise<{
    messages: Message[];
    conversationId: string;
  }>;
  getConversations: () => Promise<Conversation[]>;
  triggerIngestion: (ingestorId?: string) => Promise<{ message: string }>;
  addDocument: (data: {
    content: string;
    expert?: string;
    approved: boolean;
  }) => Promise<{ document: any }>;
  summarizeContent: (data: {
    text?: string;
    file?: File;
  }) => Promise<{ summary: string }>;
};

type ChatApiOptions = {
  fetchApi: FetchApi;
  discoveryApi: DiscoveryApi;
};

export const chatApiRef = createApiRef<ChatApi>({
  id: 'plugin.ai-assistant.chat',
});

export const createChatService = ({
  fetchApi,
  discoveryApi,
}: ChatApiOptions): ChatApi => {
  const getModels: ChatApi['getModels'] = async (): Promise<string[]> => {
    const assistantBaseUrl = await discoveryApi.getBaseUrl('ai-assistant');

    const response = await fetchApi.fetch(`${assistantBaseUrl}/models`);
    const data = await response.json();
    return data.models;
  };

  const getConversation: ChatApi['getConversation'] = async id => {
    if (!id) return [];
    const assistantBaseUrl = await discoveryApi.getBaseUrl('ai-assistant');

    const response = await fetchApi.fetch(`${assistantBaseUrl}/chat/${id}`);

    const data = await response.json();

    return data.conversation as Message[];
  };

  const sendMessage: ChatApi['sendMessage'] = async ({
    conversationId,
    modelId,
    messages,
    stream,
  }) => {
    const assistantBaseUrl = await discoveryApi.getBaseUrl('ai-assistant');
    const response = await fetchApi.fetch(`${assistantBaseUrl}/chat/message`, {
      method: 'POST',
      body: JSON.stringify({
        conversationId,
        modelId,
        messages,
        stream,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    return {
      messages: data.messages as Message[],
      conversationId: data.conversationId as string,
    };
  };

  const getConversations: ChatApi['getConversations'] = async () => {
    const assistantBaseUrl = await discoveryApi.getBaseUrl('ai-assistant');

    const response = await fetchApi.fetch(
      `${assistantBaseUrl}/chat/conversations`,
    );

    const data = await response.json();

    return data.conversations as Conversation[];
  };

  const triggerIngestion: ChatApi['triggerIngestion'] = async (
    ingestorId?: string,
  ) => {
    const assistantBaseUrl = await discoveryApi.getBaseUrl('ai-assistant');
    const response = await fetchApi.fetch(`${assistantBaseUrl}/ingest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ingestorId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `Failed to trigger ingestion: ${error.error?.message ?? response.statusText}`,
      );
    }

    return response.json();
  };

  const addDocument: ChatApi['addDocument'] = async data => {
    const assistantBaseUrl = await discoveryApi.getBaseUrl('ai-assistant');
    const response = await fetchApi.fetch(
      `${assistantBaseUrl}/wikibot/documents`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `Failed to add document: ${error.message ?? response.statusText}`,
      );
    }
    return response.json();
  };

  const summarizeContent: ChatApi['summarizeContent'] = async data => {
    const assistantBaseUrl = await discoveryApi.getBaseUrl('ai-assistant');
    const body = new FormData();
    if (data.file) {
      body.append('transcript', data.file);
    }
    if (data.text) {
      body.append('content', data.text);
    }

    const response = await fetchApi.fetch(
      `${assistantBaseUrl}/wikibot/summarize`,
      {
        method: 'POST',
        body,
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        `Failed to summarize content: ${error.message ?? response.statusText}`,
      );
    }
    return response.json();
  };

  return { getModels, getConversation, sendMessage, getConversations, triggerIngestion, addDocument, summarizeContent };
};
