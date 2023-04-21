import { Course, Section, Theme } from 'lib/material'

import { useRouter } from 'next/router'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'
import { useState, useEffect, useLayoutEffect } from 'react'
import React,{ ReactNode } from 'react'
import Footer from './Footer'
import Header from './Header'
import { Dropdown } from "flowbite-react"
import { EventFull, Event } from 'lib/types' 
import {AiOutlineUser} from 'react-icons/ai'
import {FaUser} from 'react-icons/fa'
import { Avatar } from 'flowbite-react'
import { basePath } from 'lib/basePath'
import { Material } from 'lib/material'
import EventView from './EventView'
import Sidebar from './Sidebar'

type Props = {
  material: Material,
  theme?: Theme,
  course?: Course,
  section?: Section,
  children: ReactNode,
  events: Event[],
  activeEvent: EventFull | undefined
}

const Layout: React.FC<Props> = ( props ) => {
  const router = useRouter()
  const { data: session } = useSession()

  return (
  <div className="container mx-auto">
    <Header theme={props.theme} course={props.course}/>
    <main>
      <nav className="flex px-5 py-3 mt-1 mb-5 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
      <ol className="list-none inline-flex items-center w-full space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link href="/">
            <a className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
              Home
            </a>
          </Link>
        </li>
        {props.theme && 
          <li>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
              <Link href={`/material/${props.theme.id}`}>
                <a className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                  {props.theme.name}
                </a>
              </Link>
            </div>
          </li>
        } {props.course && 
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
              <Link href={`/material/${props.theme?.id}/${props.course.id}`}>
                <a className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                  {props.course.name}
                </a>
              </Link>
            </div>
          </li>
        } { props.section && 
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
              <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                {props.section.name}
              </span>
            </div>
          </li>
        }
      </ol>
      <div className="relative flex items-center">
        <Dropdown
          label={
          <div className="inline-flex items-center text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            {session ? (
              <Avatar
                  img={session.user?.image ? session.user?.image : undefined}
                  rounded={true}
                  size="sm"
                />
              
            ) : (
              <Avatar
                  rounded={true}
                  size="sm"
                />

            )
          }
          </div>
          }
          arrowIcon={false}
          inline={true}
        >
          { session && (
          <Dropdown.Header>
              <>
              <span className="block text-sm">
                {session.user?.name}
              </span>
              <span className="block truncate text-sm font-medium">
                {session.user?.email}
              </span>
              </>
          </Dropdown.Header>
          )}
          <Dropdown.Item>
            { session ? (
              <button onClick={() => signOut()}>Sign out</button>
            ) : (
              <button onClick={() => signIn()}>Sign in</button>
            )}
          </Dropdown.Item>
        </Dropdown>
      </div>
      </nav>
      { props.activeEvent && (
        <Sidebar material={props.material} events={props.events}  />
      )}
      {props.children}
    </main>
    <Footer />
  </div>
  )
}

export default Layout
