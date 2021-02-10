import React from 'react'
import JsonP from 'fetch-jsonp'
import { Button } from '@material-ui/core'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.url = 'https://www.sysbird.jp/webapi/?format=jsonp&apikey=guest&max=30'
    this.state = {
      url:
        'https://www.sysbird.jp/webapi/?format=jsonp&apikey=guest&max=30&keyword=お菓子',
      data: [{ image: null }]
    }
  }

  componentDidMount () {
    this.getData()
  }

  async getData () {
    const data = await JsonP(this.state.url)
      .then(res => res.json())
      .then(res => res.item)
    try {
      console.log(data.item)
      this.setState({ data: data })
    } catch {
      alert('検索結果が見つかりませんでした。')
    }
  }

  render () {
    console.log(this.state.keyword)
    return (
      <>
        <div>
          <h1>検索したいお菓子を入力してください</h1>
          <SearchTextInput onChange={this.handleText.bind(this)} />
          <SearchSubmit onClick={this.handleSubmit.bind(this)} />
        </div>
        <ViewImages data={this.state.data} />
      </>
    )
  }

  handleText (event) {
    const key = '&keyword=' + event.target.value
    this.setState({ url: this.url + key, keyword: event.target.value })
  }

  handleSubmit () {
    const key = '&keyword=' + this.state.keyword

    this.componentDidMount()
  }
}

const SearchTextInput = props => {
  return <input type='text' onChange={props.onChange} />
}

const SearchSubmit = props => {
  return (
    <Button
      onClick={props.onClick}
      variant='outlined'
      href='#text-buttons'
      color='primary'
    >
      検索
    </Button>
  )
}

const ViewImages = props => {
  return (
    <>
      {props.data.map((v, i) => (
        <a href={v.url} key={i}>
          <img src={v.image} />
        </a>
      ))}
    </>
  )
}

export default App
