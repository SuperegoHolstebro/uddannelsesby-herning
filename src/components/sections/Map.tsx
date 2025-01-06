import ZoomableMapItems from '../molecules/ZoomableMapItems'
import Section from './Section'
import { ZoomableMap } from './ZoomableMap'

const Map = ({ data }) => {
  return (
    <Section id="map-section">
      <div className="col-span-full h-[70vh] md:h-auto">
        <ZoomableMap pins={data.hotspots} />
      </div>
      <ZoomableMapItems data={data} />
    </Section>
  )
}

export default Map
