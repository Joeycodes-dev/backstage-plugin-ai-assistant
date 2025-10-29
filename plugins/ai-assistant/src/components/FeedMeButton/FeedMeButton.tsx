import { Button } from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import { useApi, errorApiRef, alertApiRef } from '@backstage/core-plugin-api';
import { chatApiRef } from '../../api/chat';
import { useAsyncFn } from 'react-use';

export const FeedMeButton = () => {
  const chatApi = useApi(chatApiRef);
  const errorApi = useApi(errorApiRef);
  const alertApi = useApi(alertApiRef);

  const [{ loading }, triggerIngestion] = useAsyncFn(async () => {
    try {
      await chatApi.triggerIngestion('wikibot');
      alertApi.post({
        message: 'Wikibot ingestion triggered. Check backend logs for progress.',
        severity: 'info',
        display: 'transient',
      });
    } catch (e: any) {
      errorApi.post(e);
    }
  }, [chatApi, errorApi, alertApi]);

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={triggerIngestion}
      disabled={loading}
      startIcon={<SyncIcon />}
    >
      {loading ? 'Ingesting...' : 'Feed Me'}
    </Button>
  );
};