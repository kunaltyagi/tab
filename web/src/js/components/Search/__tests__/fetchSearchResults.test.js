/* eslint-env jest */

import YPAConfiguration from 'js/components/Search/YPAConfiguration'

beforeAll(() => {
  window.ypaAds = {
    insertMultiAd: jest.fn(),
  }
})

afterEach(() => {
  jest.clearAllMocks()
})

describe('fetchSearchResults', () => {
  it('calls window.ypaAds.insertMultiAd', () => {
    const fetchSearchResults = require('js/components/Search/fetchSearchResults')
      .default
    fetchSearchResults()
    expect(window.ypaAds.insertMultiAd).toHaveBeenCalledTimes(1)
  })

  it('uses the YPA configuration', () => {
    const fetchSearchResults = require('js/components/Search/fetchSearchResults')
      .default
    fetchSearchResults()
    expect(window.ypaAds.insertMultiAd.mock.calls[0][0]).toMatchObject(
      YPAConfiguration
    )
  })

  it('sets the query value in the YPA configuration', () => {
    const fetchSearchResults = require('js/components/Search/fetchSearchResults')
      .default
    const query = 'some search thing'
    fetchSearchResults(query)
    const config = window.ypaAds.insertMultiAd.mock.calls[0][0]
    expect(config.ypaPubParams.query).toEqual(query)
  })

  it('sets the page index in the YPA configuration', () => {
    const fetchSearchResults = require('js/components/Search/fetchSearchResults')
      .default
    const query = 'some search thing'
    const page = 234
    fetchSearchResults(query, () => {}, page)
    const config = window.ypaAds.insertMultiAd.mock.calls[0][0]
    expect(config.ypaPageCount).toEqual('234')
  })

  it('defaults the page index to "1" in the YPA configuration if it\'s not passed', () => {
    const fetchSearchResults = require('js/components/Search/fetchSearchResults')
      .default
    const query = 'some search thing'
    fetchSearchResults(query)
    const config = window.ypaAds.insertMultiAd.mock.calls[0][0]
    expect(config.ypaPageCount).toEqual('1')
  })

  it('sets the error callback in the YPA configuration', () => {
    const fetchSearchResults = require('js/components/Search/fetchSearchResults')
      .default
    const mockCallback = jest.fn()
    fetchSearchResults(null, mockCallback)
    const passedCallback =
      window.ypaAds.insertMultiAd.mock.calls[0][0].ypaAdSlotInfo[1].ypaOnNoAd
    passedCallback('foo')
    expect(mockCallback).toHaveBeenCalledWith('foo')
  })
})
