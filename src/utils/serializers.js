export const serializers = {
    types: {
      // Add serializers for other block types if needed
    },
    marks: {
      // Add serializers for other block types if needed
    },
    block: {
      h2: ({ children }) => <h2 className="mt-8 mb-4 font-bold custom-h2 max-w-prose text-balance text-huge">{children}</h2>,
      h3: ({ children }) => <h3 className="font-bold custom-h3 max-w-prose text-balance text-large">{children}</h3>,
      h4: ({ children }) => <h4 className="font-bold custom-h4 max-w-prose text-balance text-medium">{children}</h4>,
      h5: ({ children }) => <h5 className="font-bold custom-h5 max-w-prose text-balance text-increased">{children}</h5>,
      h6: ({ children }) => <h6 className="font-bold custom-h6 max-w-prose text-balance text-small">{children}</h6>,
      a: ({ children }) => <a className="font-bold underline custom-a text-green hover:text-light-base">{children}</a>,
      ul: ({ children }) => <ul className="ml-5 list-disc list-outside custom-ul">{children}</ul>,
      ol: ({ children }) => <ol className="ml-5 list-decimal list-outside custom-ol">{children}</ol>,
      strong: ({ children }) => <strong className="font-bold custom-strong">{children}</strong>,
      em: ({ children }) => <em className="italic custom-em">{children}</em>,    
      code: ({ children }) => <code className="px-1 py-0 bg-gray-200 rounded custom-code">{children}</code>,
      p: ({ children }) => <p className="mt-2 mb-4 custom-p text-regular ">{children}</p>,
      li: ({ children }) => <li className="custom-li">{children}</li>,
      pre: ({ children }) => <pre className="custom-pre">{children}</pre>,
      sub: ({ children }) => <sub className="custom-sub">{children}</sub>,
      sup: ({ children }) => <sup className="custom-sup">{children}</sup>,
    }
  };