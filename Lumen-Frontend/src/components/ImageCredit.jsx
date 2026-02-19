import React from 'react'

const ImageCredit = ({ username }) => {
    return (
        <div class="mt-3 text-xs text-gray-600 leading-relaxed dark:text-gray-300">
            Image credit:
            <a
                href={`https://unsplash.com/@${username}`}
                target="_blank"
                rel="noopener noreferrer"
                class="font-medium text-blue-400 hover:text-blue-300 hover:underline"
            >
                {" "}@{username} {" "}
            </a>
            on{" "}
            <a
                href="https://unsplash.com"
                target="_blank"
                rel="noopener noreferrer"
                class="font-medium text-blue-400 hover:text-blue-300 hover:underline"
            >
                Unsplash
            </a>.
            <p class="block mt-1 text-[12px] text-gray-600 dark:text-gray-300">
                Lumen Captures does not claim ownership of this image. All rights remain with the original creator.
            </p>
        </div>

    )
}

export default ImageCredit