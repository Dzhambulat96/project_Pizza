import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={480}
        viewBox="0 0 280 480"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="140" cy="136" r="125" />
        <rect x="2" y="315" rx="0" ry="0" width="273" height="29" />
        <rect x="3" y="359" rx="0" ry="0" width="273" height="86" />
        <rect x="5" y="453" rx="0" ry="0" width="128" height="24" />
        <rect x="144" y="452" rx="15" ry="15" width="128" height="24" />
    </ContentLoader>
)

export default Skeleton
