import Heading from '../atoms/Heading'
import Paragraph from '../atoms/Paragraph'
import EducationInfo from './EducationInfo'

function EducationContent({ item }) {
  return (
    <div className="mt-10">
      <div>
        <Heading
          tag="h4"
          type="h4"
          dangerouslySetInnerHTML={{
            __html: `kl. ${item.time.start}`,
          }}
          spacing="none"
        />
      </div>
      <Heading
        tag="h3"
        type="h3"
        dangerouslySetInnerHTML={{ __html: item.title }}
        spacing="none"
      />
      <EducationInfo education={item.edducation} />
      <div className="mt-10">
        <Paragraph portableText>{item.description}</Paragraph>
      </div>
    </div>
  )
}
export default EducationContent
