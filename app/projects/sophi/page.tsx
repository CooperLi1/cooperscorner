import { ProjectHeader, MediaList, type MediaItem, MediaCard } from '@/app/components/projects/ProjectScaffold';
import { Card } from '@/app/components/ui/Card';

const media: MediaItem[] = [
  { type: 'video', src: 'https://www.youtube.com/embed/K7QqWFAu3VA?start=2' },
];

export default function ProjectPage() {
  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto space-y-6">
        <Card className="p-6 md:p-8">
          <ProjectHeader title="Sophi" />
        </Card>
        <Card className="p-0">
          <MediaCard>
            <MediaList items={media} />
          </MediaCard>
        </Card>
      </div>
    </div>
  );
}
