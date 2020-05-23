export class Quiz {
    public id: number;
    public question: string;
    public firstChoice: string;
    public secondChoice: string;
    public thirdChoice: string;
    public fourthChoice: string;
    public correctChoice: string;
    public bookId: number;
}

export enum CorrectChoice {
    firstChoice = "firstChoice",
    secondChoice = "secondChoice",
    thirdChoice = "thirdChoice",
    fourthChoice = "fourthChoice",
}