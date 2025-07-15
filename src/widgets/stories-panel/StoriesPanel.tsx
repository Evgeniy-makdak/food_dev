import './StoriesPanel.scss'

export default function StoriesPanel({ stories, setIsOpenStoryPanel, setSelectedStory }: { stories: any[], setIsOpenStoryPanel: (isOpenStoryPanel: boolean) => void, setSelectedStory: (story: any) => void }) {
  return (
    <div className='stories'>
      <div className="stories--wrapper">
        {stories.map((story, index) => (

          <div
            key={index}
            className="stories--story"
            style={{ backgroundImage: `url(../../img/stories/${story.img})` }}
            onClick={() => {
              setIsOpenStoryPanel(true)
              setSelectedStory(index + 1)
            }}
          >
            <div className="stories--story-text">
              <p>{story.title}</p>
            </div>
          </div>

        ))}
      </div>
    </div>

  )
}