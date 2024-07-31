import { LanguageIcon } from './Icons';
import './ChatSkeletonStyles.css';

function ChatSkeleton() {
  return (
    <div className="ml-6 mr-20 flex">
      <section className="chat">
        <LanguageIcon class="mt-2 mr-2" />
        <div className="chat-content">
          <div className="chat-text--small loading"></div>
          <div className="chat-text--large loading"></div>
        </div>
      </section>
    </div>
  );
}

export default ChatSkeleton;
