/* eslint-env jest */

afterEach(() => {
  jest.clearAllMocks()
  jest.resetModules()
})

describe('getMockUniqueURL', () => {
  it('returns URLs with incrementing numbers', () => {
    const { getMockUniqueURL } = require('js/utils/test-utils-search')
    expect(getMockUniqueURL()).toEqual('https://example.com/some-url-1')
    expect(getMockUniqueURL()).toEqual('https://example.com/some-url-2')
    expect(getMockUniqueURL()).toEqual('https://example.com/some-url-3')
  })
})

describe('getMockUniqueID', () => {
  it('returns IDs with incrementing numbers', () => {
    const { getMockUniqueID } = require('js/utils/test-utils-search')
    expect(getMockUniqueID()).toEqual(
      'https://api.cognitive.microsoft.com/api/v7/some-fake-id-1'
    )
    expect(getMockUniqueID()).toEqual(
      'https://api.cognitive.microsoft.com/api/v7/some-fake-id-2'
    )
    expect(getMockUniqueID()).toEqual(
      'https://api.cognitive.microsoft.com/api/v7/some-fake-id-3'
    )
  })
})

describe('getMockBingWebPageResult', () => {
  it('includes the expected keys', () => {
    const { getMockBingWebPageResult } = require('js/utils/test-utils-search')
    expect(Object.keys(getMockBingWebPageResult()).sort()).toEqual([
      'dateLastCrawled',
      'deepLinks',
      'displayUrl',
      'id',
      'name',
      'searchTags',
      'snippet',
      'url',
    ])
  })

  it('generates unique IDs for each mock webpage', () => {
    const { getMockBingWebPageResult } = require('js/utils/test-utils-search')
    expect(getMockBingWebPageResult().id).not.toEqual(
      getMockBingWebPageResult().id
    )
  })

  it('generates unique URLs for each mock webpage', () => {
    const { getMockBingWebPageResult } = require('js/utils/test-utils-search')
    expect(getMockBingWebPageResult().url).not.toEqual(
      getMockBingWebPageResult().url
    )
  })

  it('allows overriding values', () => {
    const { getMockBingWebPageResult } = require('js/utils/test-utils-search')
    const defaultData = getMockBingWebPageResult()
    expect(defaultData).toMatchObject({
      dateLastCrawled: '2018-12-24T15:23:39',
      displayUrl: 'https://example.com',
      name: 'A <b>Really Awesome</b> Webpage',
    })
    expect(
      getMockBingWebPageResult({
        dateLastCrawled: '2020-11-03T20:01:21',
        displayUrl: 'https://another-example.com',
      })
    ).toMatchObject({
      dateLastCrawled: '2020-11-03T20:01:21',
      displayUrl: 'https://another-example.com',
      name: 'A <b>Really Awesome</b> Webpage',
    })
  })
})
