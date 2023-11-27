import { PropsWithChildren, createContext, useState } from 'react';

interface IModalReviewData {
  comment: string | null;
  book_id: string;
  rating: number | null;
}

interface ModalContextType {
  isModalOpen: boolean;
  reviewData: IModalReviewData;
  openModalWithReview: (
    comment: string | null,
    book_id: string,
    rating: number | null,
  ) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  isModalOpen: false,
  //set default/initial values
  reviewData: {
    comment: '',
    book_id: '',
    rating: 0,
  },
  openModalWithReview: () => {},
  closeModal: () => {},
});

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewData, setReviewData] = useState<IModalReviewData>({
    comment: '',
    book_id: '',
    rating: 0,
  });

  const openModalWithReview = (
    comment: string | null,
    book_id: string,
    rating: number | null,
  ) => {
    setReviewData({ comment, book_id, rating });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const contextValue = {
    isModalOpen,
    reviewData,
    openModalWithReview,
    closeModal,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};
