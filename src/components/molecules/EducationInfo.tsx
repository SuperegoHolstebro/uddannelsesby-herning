import Paragraph from '../atoms/Paragraph'

function EducationInfo({ education }) {
  if (!education) return null

  return (
    <div className="flex flex-col gap-1 mb-4 md:items-center md:gap-5 md:flex-row">
      <Paragraph spacing="none">{education.title}</Paragraph>
      {education.infomation?.address && (
        <>
          <Paragraph spacing="none">
            <strong className="hidden text-small md:block">|</strong>
          </Paragraph>
          <Paragraph spacing="none">{education.infomation?.address}</Paragraph>
        </>
      )}
    </div>
  )
}

export default EducationInfo
