// https://developers.google.com/books/docs/v1/reference/volumes

import { parseBook } from './helpers';
import { IBook } from './types';

// I copied the example object provided by google and provided values
const testData = {
  kind: 'books#volume',
  id: 'testId',
  etag: 'testEtag',
  selfLink: 'string',
  volumeInfo: {
    title: 'test title 123',
    subtitle: 'string',
    authors: ['test', 'authors', 'f-okd', '123'],
    publisher: 'string',
    publishedDate: '2020-09-29',
    industryIdentifiers: [
      {
        type: 'string',
        identifier: 'string',
      },
    ],
    pageCount: 10,
    dimensions: {
      height: 'string',
      width: 'string',
      thickness: 'string',
    },
    printType: 'string',
    mainCategory: 'string',
    categories: ['string'],
    averageRating: 10,
    ratingsCount: 10,
    contentVersion: 'string',
    imageLinks: {
      smallThumbnail: 'https://via.placeholder.com/150/92c952',
      thumbnail: 'https://via.placeholder.com/600/92c952',
      small: 'string',
      medium: 'string',
      large: 'string',
      extraLarge: 'string',
    },
    language: 'string',
    previewLink: 'string',
    infoLink: 'string',
    canonicalVolumeLink: 'string',
  },
  //We're not checking a user's google account for reviews so this isn't a big deal
  userInfo: {
    review: 'testReview',
    readingPosition: 'testPosition',
    isPurchased: true,
    isPreordered: true,
    updated: '2023-12-03T20:25:37',
  },
  saleInfo: {
    country: 'string',
    saleability: 'string',
    onSaleDate: '2023-12-03T20:25:37',
    isEbook: true,
    listPrice: {
      amount: 13.141592653591,
      currencyCode: 'string',
    },
    retailPrice: {
      amount: 3.14159265359,
      currencyCode: 'string',
    },
    buyLink: 'string',
  },
  accessInfo: {
    country: 'string',
    viewability: 'string',
    embeddable: true,
    publicDomain: true,
    textToSpeechPermission: 'string',
    epub: {
      isAvailable: true,
      downloadLink: 'string',
      acsTokenLink: 'string',
    },
    pdf: {
      isAvailable: true,
      downloadLink: 'string',
      acsTokenLink: 'string',
    },
    webReaderLink: 'string',
    accessViewStatus: 'string',
    downloadAccess: {
      kind: 'books#downloadAccessRestriction',
      volumeId: 'string',
      restricted: true,
      deviceAllowed: true,
      justAcquired: true,
      maxDownloadDevices: 10,
      downloadsAcquired: 10,
      nonce: 'string',
      source: 'string',
      reasonCode: 'string',
      message: 'string',
      signature: 'string',
    },
  },
  searchInfo: {
    textSnippet: 'string',
  },
};

const undefinedTestData = {
  kind: 'books#volume',
  etag: 'testEtag',
  selfLink: 'string',
  volumeInfo: {
    subtitle: 'string',
    publisher: 'string',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    industryIdentifiers: [
      {
        type: 'string',
        identifier: 'string',
      },
    ],
    pageCount: 10,
    dimensions: {
      height: 'string',
      width: 'string',
      thickness: 'string',
    },
    printType: 'string',
    mainCategory: 'string',
    categories: ['string'],
    averageRating: 10,
    ratingsCount: 10,
    contentVersion: 'string',
    imageLinks: {
      small: 'string',
      medium: 'string',
      large: 'string',
      extraLarge: 'string',
    },
    language: 'string',
    previewLink: 'string',
    infoLink: 'string',
    canonicalVolumeLink: 'string',
  },
  //We're not checking a user's google account for reviews so this isn't a big deal
  userInfo: {
    review: 'testReview',
    readingPosition: 'testPosition',
    isPurchased: true,
    isPreordered: true,
    updated: '2023-12-03T20:25:37',
  },
  saleInfo: {
    country: 'string',
    saleability: 'string',
    onSaleDate: '2023-12-03T20:25:37',
    isEbook: true,
    listPrice: {
      amount: 13.141592653591,
      currencyCode: 'string',
    },
    retailPrice: {
      amount: 3.14159265359,
      currencyCode: 'string',
    },
    buyLink: 'string',
  },
  accessInfo: {
    country: 'string',
    viewability: 'string',
    embeddable: true,
    publicDomain: true,
    textToSpeechPermission: 'string',
    epub: {
      isAvailable: true,
      downloadLink: 'string',
      acsTokenLink: 'string',
    },
    pdf: {
      isAvailable: true,
      downloadLink: 'string',
      acsTokenLink: 'string',
    },
    webReaderLink: 'string',
    accessViewStatus: 'string',
    downloadAccess: {
      kind: 'books#downloadAccessRestriction',
      volumeId: 'string',
      restricted: true,
      deviceAllowed: true,
      justAcquired: true,
      maxDownloadDevices: 10,
      downloadsAcquired: 10,
      nonce: 'string',
      source: 'string',
      reasonCode: 'string',
      message: 'string',
      signature: 'string',
    },
  },
  searchInfo: {
    textSnippet: 'string',
  },
};

describe('test for parseBook function', () => {
  it('should return only the relevant extracted information from an object of "volume" type', () => {
    const testBook: IBook = parseBook(testData);
    expect(testBook.id).toEqual('testId');
    expect(testBook.title).toEqual('test title 123');
    expect(testBook.authors).toEqual(['test', 'authors', 'f-okd', '123']);
    expect(testBook.publishedDate).toEqual('2020-09-29');
    expect(testBook.smallThumbnail).toEqual(
      'https://via.placeholder.com/150/92c952',
    );
    expect(testBook.thumbnail).toEqual(
      'https://via.placeholder.com/600/92c952',
    );
  });
  it('should return undefined values by default, where one is not provided', () => {
    const undefinedTestBook: IBook = parseBook(undefinedTestData);
    expect(undefinedTestBook.id).toBeUndefined();
    expect(undefinedTestBook.title).toBeUndefined();
    expect(undefinedTestBook.authors).toBeUndefined();
    expect(undefinedTestBook.publishedDate).toBeUndefined();
    expect(undefinedTestBook.smallThumbnail).toBeUndefined();
    expect(undefinedTestBook.thumbnail).toBeUndefined();
  });
});
