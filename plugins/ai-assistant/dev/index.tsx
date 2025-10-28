import { createDevApp } from '@backstage/dev-utils';
import { aiAssistantPlugin, AiAssistantPage } from '../src/plugin';
import { signalsPlugin } from '@backstage/plugin-signals';
import { FeedMePage } from '../src/components/FeedMePage';

createDevApp()
  .registerPlugin(signalsPlugin)
  .registerPlugin(aiAssistantPlugin)
  .addPage({
    element: <AiAssistantPage />,
    title: 'Platty',
    path: '/ai-assistant',
  })
  .addPage({
    element: <FeedMePage />,
    title: 'Feed Me!',
    path: '/new-route',
  })
  .render();
