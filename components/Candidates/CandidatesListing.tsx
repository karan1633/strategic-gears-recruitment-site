import { useState, useRef } from 'react';
import { dataSet } from '../../datasets/candidate-dataset';
import styles from '../../styles/vertical-tabs.module.css';
import CandidateCard from '@/cards/candidate-card';
import useCandidatesHook from '@/hooks/candidates-hook/candidates-list-hook';
import NoData from '../NoData';
import Link from 'next/link';

const CandidatesListing = () => {
  const {
    token,
    interviewRoundsList,
    skillsList,
    candidatesList,
    updateList,
    setUpdateList,
  } = useCandidatesHook();
  const [activeMainTab, setActiveMainTab] = useState(0);
  const [activeNestedTab, setActiveNestedTab] = useState(0);
  const mainTabRef: any = useRef(0);
  const contentRef: any = useRef(null);
  const handleMainTabIndex = (index: number) => {
    setActiveMainTab(index);
    mainTabRef.current = index;
    setActiveNestedTab(0);
  };
  const handleTabClick = (index: number) => {
    setActiveNestedTab(index);
  };

  const updateCandidatesList = () => {
    setUpdateList(updateList + 1);
  };

  // console.log('candidates list', candidatesList);
  return (
    <>
      {candidatesList?.length > 0 ? (
        <>
          {' '}
          <div className="" style={{ backgroundColor: '#f8f9fa' }}>
            <nav>
              <div className="nav nav-tabs" id="nav-tab" role="tablist">
                {candidatesList?.length > 0 &&
                  candidatesList.map((tab: any, index: number) => (
                    <button
                      key={index}
                      className={`nav-link ${styles.main_tab} ${
                        activeMainTab === index
                          ? styles.main_tab_active
                          : styles.main_tab_stale
                      }`}
                      id={`${tab.main_tab}-tab`}
                      data-toggle="tab"
                      data-target={`#${tab.main_tab}`}
                      type="button"
                      role="tab"
                      aria-controls={`${tab.main_tab}`}
                      aria-selected={`${
                        activeMainTab === index ? true : false
                      }`}
                      onClick={() => handleMainTabIndex(index)}
                    >
                      {tab.main_tab}{' '}
                      <span className="badge badge-primary mx-2">
                        {tab.count}
                      </span>
                    </button>
                  ))}
              </div>
            </nav>
          </div>
          <div className={`tab-content ${styles.tab_content_main}`}>
            <div
              className={`tab-pane ${
                activeMainTab === mainTabRef.current ? 'active' : ''
              }`}
            >
              <div className="row">
                <div
                  className={`col-12 col-lg-2 col-md-12 ${styles.nested_tab_main_div}`}
                >
                  <div
                    className={` flex-column nav-pills ${styles.nav_pills_main_div}`}
                  >
                    {candidatesList?.length > 0 &&
                      candidatesList[activeMainTab]?.nested_tabs.map(
                        (nested_tab: any, index: number) => (
                          <div
                            key={index}
                            className={`d-flex justify-content-between align-items-center ${
                              styles.tab_link
                            } ${styles.nested_tabs_container}
                            ${
                              activeNestedTab === index
                                ? styles.active
                                : styles.inactive_nested_tab
                            }`}
                            onClick={() => handleTabClick(index)}
                          >
                            <div>{nested_tab.label}</div>
                            <span className={`badge ${styles.bg_color} mx-2`}>
                              {nested_tab.nested_count}
                            </span>
                          </div>
                        )
                      )}
                  </div>
                </div>
                {/* <div className={`  ${styles.tab_content_container}`}> */}
                <div
                  className={`tab-content col-12 col-lg-10 col-md-12 ${styles.scrollable_content} ${styles.tab_content}`}
                >
                  {candidatesList?.length > 0 &&
                    candidatesList[activeMainTab].nested_tabs.map(
                      (nested_tab_content: any, index: number) => (
                        <div
                          key={index}
                          className={`tab-pane  ${
                            activeNestedTab === index ? 'active' : ''
                          }`}
                        >
                          <div className={``} ref={contentRef}>
                            <CandidateCard
                              token={token}
                              activeMainTab={candidatesList[activeMainTab]}
                              activeNestedTab={
                                candidatesList[activeMainTab].nested_tabs[
                                  activeNestedTab
                                ]
                              }
                              status={nested_tab_content.label}
                              skillsList={skillsList}
                              content={nested_tab_content.content}
                              interviewRoundsList={interviewRoundsList}
                              updateCandidatesList={updateCandidatesList}
                            />
                          </div>
                        </div>
                      )
                    )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <NoData />
          <div
            className="d-flex justify-content-center"
            style={{ backgroundColor: '#fff', height: '75px' }}
          >
            <Link href={'/candidates'} className={`${styles.no_data_text}`}>
              {' '}
              Check out New Candidates List
            </Link>
          </div>
        </>
      )}
    </>
  );
};
export default CandidatesListing;
