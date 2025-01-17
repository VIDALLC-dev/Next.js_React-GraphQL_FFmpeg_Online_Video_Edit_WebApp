import { useState, useEffect, Fragment } from 'react'

import LineCursor from '../LineCursor'
import RenderVideoOnTimeline from '../RenderVideoOnTimeline'

const Timeline = ({ videos, handleSetImagePreview, setPreviewByLinePosition, imagePreviewId, frameSize }) => {
    const [playing, setPlaying] = useState(false)
    const [framesPerSecond, setFramesPerSecond] = useState(frameSize)
    const [timelineSeconds, setTimelineSeconds] = useState(frameSize)
    const [lineCursorPosition, setLineCursorPosition] = useState(0)

    useEffect(() => {
        setPreviewByLinePosition(lineCursorPosition);
    }, [lineCursorPosition]);

    useEffect(() => {
        setLineCursorPosition(imagePreviewId * frameSize);
    }, [imagePreviewId]);

    const timelineWidth = framesPerSecond * timelineSeconds // 60 (default) frames per second, multiplied by 360 (default) seconds.

    return (
        <div className="w-full h-full">
            <div className="h-12 w-full border-b border-gray-200 flex justify-between items-center px-4">
                <span
                    onClick={() => setPlaying(!playing)}
                    className="cursor-pointer text-brown-500 font-bold uppercase text-sm"
                >
                    {playing ? 'pause' : 'play'}
                </span>

                <span className="rounded-full bg-gray-300 text-gray-900 font-bold text-sm px-3 py-1">
                    00:00:00:00
                </span>

                <svg
                    className="cursor-pointer"
                    style={{ transform: 'rotate(180deg)' }}
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth={0}
                    viewBox="0 0 448 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z" />
                </svg>
            </div>

            <div
                style={{ height: 'calc(100% - 4rem)' }}
                className="relative w-full px-4 mt-4 overflow-scroll"
            >
                <LineCursor frameSize={frameSize} position={lineCursorPosition} setPosition={setLineCursorPosition} />
                <div
                    className="bg-gray-100 h-12 rounded-lg flex"
                    style={{ width: timelineWidth }}
                >
                    {videos.map((video) => (
                        <Fragment key={video.fileName}>
                            <RenderVideoOnTimeline handleSetImagePreview={handleSetImagePreview} video={video} />

                            <span className="video-separator-marker"></span>
                        </Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Timeline
