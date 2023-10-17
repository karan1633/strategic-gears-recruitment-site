import styles from "../styles/candidate-cards.module.css";

const CandidateCard = ({ content }: any) => {
  return (
    <div>
      {content?.map((content_card: any, index: number) => {
        return (
          <>
            <div className=" mt-3 mb-3">
              <div className="d-flex justify-content-between align-items-center mx-3 mt-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="mx-3">
                    <p className={`${styles.card_content} ${styles.f7}`}>
                      {content_card?.name}
                    </p>
                  </div>
                  <div className="mx-3">
                    <p className={`${styles.card_content}`}>
                      {content_card?.designation}
                    </p>
                  </div>
                </div>
                {content_card.show_btn ? (
                  <button type="button" className="btn btn-outline-primary">
                    Schedule
                  </button>
                ) : (
                  <div className="">
                    <p className={`${styles.card_content}`}>
                      <i className="fas fa-calendar-alt"></i>{" "}
                      {content_card?.date}
                    </p>
                  </div>
                )}
              </div>

              <div className="mx-5">
                <p className={`${styles.card_content} ${styles.card_p}`}>
                  {content_card?.description}
                </p>
              </div>
            </div>
            <hr />
          </>
        );
      })}
    </div>
  );
};

export default CandidateCard;
