import { cn } from "@/lib/utils";
import Badge from "../common/Badge";
import DialogText from "../common/DialogText";
import LineWrapper from "../common/LineWrapper";
import CtaButton from "../common/CtaButton";
import { Steps } from "../CaseProcessDialog";
import StepWrapper from "../common/StepWrapper";
import { Patient } from "../CasesTable";
import VerticalTimeIndicator from "../common/VerticalTimeIndicator";
import CaneDisplay from "../common/CaneDisplay";
import StrawDisplay from "../common/StrawDisplay";
import { useEffect, useState } from "react";
import PrimaryButton from "../common/PrimaryButton";
import CaseStatusItem from "./CaseStatusItem";

export default function CaseStatusStep({
  caseData,
  currentState,
  currentStep,
  setNextStep,
}: {
  caseData: Patient;
  currentStep: Steps;
  setNextStep: (step: Steps) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [isMoveCane, setIsMoveCane] = useState(false);
  const [isRemovingOldCane, setIsRemovingOldCane] = useState(false);
  const [isStartAnimation, setIsStartAnimation] = useState(false);
  const [isFadeOutEmptyRow, setIsFadeOutEmptyRow] = useState(false);
  const [isAnimationDone, setIsAnimationDone] = useState(false);
  const [isAnimationDoneCompletely, setIsAnimationDoneCompletely] = useState(false);

  const type = caseData.embryos > 0 ? "embryos" : "oocytes";
  const count = caseData.embryos > 0 ? caseData.embryos : caseData.oocytes;

  const canOrganize = currentState.samples.length > 0;
  const canPrepare = currentState.newStraws.length > 0;

  useEffect(() => {
    setTimeout(() => {
      setIsFirst(false);
    }, 800);
  }, []);
  useEffect(() => {
    if (currentState.isDone) {
      setTimeout(() => {
        // startAnimation();
        setIsStartAnimation(true);
      }, 1000);
    }
  }, [currentState]);

  useEffect(() => {
    if (isStartAnimation) {
      console.log("DDDDOOOONNNNEEEE");
      startAnimation();
    }
  }, [isStartAnimation]);

  const startAnimation = () => {
    // setTimeout(() => {
    if (!isFirst) {
      // Animation logic here
      setIsMoveCane(true);
      setTimeout(() => {
        setIsMoveCane(false);
        setIsRemovingOldCane(true);
        setTimeout(() => {
          setIsFadeOutEmptyRow(true);
          setTimeout(() => {
            setIsAnimationDone(true);
            setTimeout(() => {
              setIsAnimationDoneCompletely(true);
              setTimeout(() => {
                // setIsFadeOutEmptyRow(false);
                // setIsRemovingOldCane(false);
                setIsStartAnimation(false);
              }, 1000);
            }, 800);
          }, 800);
        }, 800);
      }, 800);
    }
    // }, 3000);
  };

  return (
    <StepWrapper isShow={currentStep === "caseStatus"}>
      <VerticalTimeIndicator className="w-30 " height={100} minutes={30} />
      <div className="ml-4">
        {!isAnimationDoneCompletely && (
          <section className="space-y-3">
            <div className={cn(isFadeOutEmptyRow && "opacity-0 transition-all duration-800")}>
              <DialogText>Prepare for storage:</DialogText>
            </div>

            <div
              className={cn("relative", canPrepare && "cursor-pointer")}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {!isRemovingOldCane && (
                <LineWrapper
                  hasHoverEffect
                  className={cn(
                    isStartAnimation && "absolute top-0 left-0 w-full",
                    isMoveCane && "absolute top-0 left-0 w-full top-[58px] transition-all duration-800",
                  )}
                >
                  <CaseStatusItem
                    caseData={caseData}
                    currentState={currentState}
                    currentStep={currentStep}
                    setNextStep={setNextStep}
                    isHovered={isHovered}
                  />
                </LineWrapper>
              )}

              {isMoveCane && (
                <div className={cn(" top-0 left-0 opacity-100 h-[62px] w-full -z-10", isMoveCane && "block")} />
              )}
            </div>
          </section>
        )}

        {/* {currentState.isDone && ( */}
        <section className={cn("space-y-3 relative min-h[26px]", !isAnimationDoneCompletely && "mt-6")}>
          <div
            className={cn(
              !isAnimationDoneCompletely && isStartAnimation && "absolute top-0 left-0 w-full ",
              !isAnimationDoneCompletely && isMoveCane && `-top-[${74}px] transition-all duration-800`,
              !isAnimationDoneCompletely &&
                isAnimationDone &&
                " transform-[translateY(-52px)] transition-all duration-800",
            )}
          >
            <DialogText className="mb-4">Ready for storage:</DialogText>

            {isRemovingOldCane && !isMoveCane && (
              <LineWrapper>
                <CaseStatusItem
                  caseData={caseData}
                  currentState={currentState}
                  currentStep={currentStep}
                  setNextStep={setNextStep}
                />
              </LineWrapper>
            )}
          </div>
        </section>
        {/* )} */}
        {/* <section className={cn("absolute top-[230px] left-0 w-full")}> */}
        <section
          className={cn(
            "mt-6 space-y-3",
            isStartAnimation && "absolute top-[154px] left-[16px] w-full",
            isAnimationDone && "top-[106px] transition-all duration-800",
          )}
        >
          <DialogText>Stored:</DialogText>
          <LineWrapper>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <Badge type={type} number={3} text="Straws" isRounded={false} />
              <Badge type={type} number={8} text="Embryos" />
              <span className="text-muted-foreground">Cane 9393103</span>
            </div>
          </LineWrapper>
        </section>
        {/* <div className="mt-8">{newCaseData && <CaseEditor caseId={newCaseData.id} />}</div> */}
        <div className="absolute bottom-0 -mb-34">
          {/* {!isStartAnimation && (
            <>
              <PrimaryButton onClick={() => setIsStartAnimation(!isStartAnimation)}>animation</PrimaryButton>{" "}
              isMoveCane: {isStartAnimation + ""}
            </>
          )}
          <div>isFirst: {isFirst + ""}</div>
          <div>isRemovingOldCane: {isRemovingOldCane + ""}</div>
          <div>isMoveCane: {isMoveCane + ""}</div>
          <div>isFadeOutEmptyRow: {isFadeOutEmptyRow + ""}</div>
          <div>isAnimationDone: {isAnimationDone + ""}</div>
          <div>isAnimationDoneCompletely: {isAnimationDoneCompletely + ""}</div>
          isMoveCane: {isMoveCane + ""} */}
        </div>
      </div>
    </StepWrapper>
  );
}
