import { createDevApp } from '@backstage/dev-utils';
import { aiAssistantPlugin, AiAssistantPage } from '../src/plugin';
import { signalsPlugin } from '@backstage/plugin-signals';

createDevApp()
  .registerPlugin(signalsPlugin)
  .registerPlugin(aiAssistantPlugin)
  .addPage({
    element: <AiAssistantPage />,
    title: 'Platty',
    path: '/ai-assistant',
  })
  .render();
