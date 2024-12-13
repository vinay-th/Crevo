import { protectServer } from '@/app/features/auth/utils';
import Editor from '@/app/features/editor/components/editor';

const EditorPage = async () => {
  await protectServer();
  return <Editor />;
};

export default EditorPage;
