import React from 'react'
import { useRouteData } from 'react-static'
import TagCloud from "../containers/TagCloud";
import { Link } from 'components/Router'
import LangSwitcher from "../containers/LangSwitcher";

export default function Post() {
  const { post, isDefault, lang, langRefs } = useRouteData()
  return (
    <div>
      <LangSwitcher langRefs={langRefs} />
      <Link to="/">{'<'} Back</Link>
      <br />
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <TagCloud isDefault={isDefault} lang={lang} tags={[{value: "tag1", "hits": 2}, {value: "tag2", "hits": 2}, {value: "tag3", "hits": 1},  {value: "tag4", "hits": 10}]}/>
    </div>
  )
}
