import ZoomableMapItems from '../molecules/ZoomableMapItems'
import Section from './Section'
import { ZoomableMap } from './ZoomableMap'

const Map = ({ data }) => {
  return (
    <Section id="map-section">
      <div className="col-span-full">
        <ZoomableMap pins={data.hotspots} />
      </div>
      <ZoomableMapItems data={data} />
    </Section>
  )
}

export default Map
