import Heading from '@/components/atoms/Heading'
import React from 'react'

const MenuItems = [
  {
    title: 'Sider',
    url: '/super-login/structure/sider',
    addUrl: '/super-login/intent/create/template=page;type=page/',
  },
  {
    title: 'Begivenheder',
    url: '/super-login/structure/begivenheder',
    addUrl: '/super-login/intent/create/template=event;type=event/',
  },
  {
    title: 'Uddannelsessteder',
    url: '/super-login/structure/uddannelsessteder',
    addUrl: '/super-login/intent/create/template=school;type=school/',
  },
  {
    title: 'Virksomheder',
    url: '/super-login/structure/virksomheder',
    addUrl: '/super-login/intent/create/template=company;type=company/',
  },
  {
    title: 'Rabatter',
    url: '/super-login/structure/rabatter',
    addUrl: '/super-login/intent/create/template=company;type=company/',
  },
  {
    title: 'Indstillinger',
    url: '/super-login/structure/indstillinger',
    addUrl: '',
  },
  {
    title: 'Menu',
    url: '/super-login/structure/',
    addUrl: '',
  },
]

const LinksWidget = () => {
  return (
    <div className="flex flex-col h-full p-6 rounded-lg bg-light-0">
      <div className="flex-grow">
        <Heading type="h3" tag="h3" className="font-light">
          Genveje
        </Heading>{' '}
        <div>
          <ul className="flex flex-col gap-3">
            {MenuItems.map((item, index) => (
              <li
                className="flex items-center justify-between p-2 transition-colors duration-300 bg-white rounded-md group hover:bg-dark"
                key={index}
              >
                <a className="w-full group-hover:text-white" href={item.url}>
                  {item.title}
                </a>
                {item.addUrl && (
                  <>
                    <span className="block w-px h-5 mr-4 bg-black group-hover:bg-white"></span>
                    <a
                      className="w-auto transition-all group-hover:text-white hover:scale-150"
                      href={item.addUrl}
                    >
                      +
                    </a>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-auto">
        <ul className="flex flex-col gap-3">
          <li className="flex items-center justify-between p-2 transition-colors duration-300 bg-white rounded-md group hover:bg-dark">
            <a
              className="w-full group-hover:text-white"
              href={`https://sanity.io/manage/project/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/members`}
            >
              + Tilføj bruger
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default LinksWidget
