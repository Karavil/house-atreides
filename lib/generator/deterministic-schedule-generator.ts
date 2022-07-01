import { LoopedList } from "../struct/looped-list";
import { generateWeeklySeed, randomWithSeed } from "../util/random";

export class DeterministicScheduleGenerator<
  TThing extends string,
  TUser extends string
> {
  private readonly scheduleFor: readonly TUser[];
  private readonly activities: readonly TThing[];

  private readonly seedKey: string;

  private readonly weekOffset: number;

  constructor(opts: {
    scheduleFor: readonly TUser[];
    activities: readonly TThing[];
    seedKey: string;
    weekOffset?: number;
  }) {
    const { scheduleFor, activities, seedKey, weekOffset = 0 } = opts;
    console.debug("Creating DeterministicScheduleGenerator", opts);

    this.scheduleFor = scheduleFor;
    this.activities = activities;

    this.seedKey = seedKey;
    this.weekOffset = weekOffset;
  }

  generateRandomSchedule(): Record<TUser, TThing[]> {
    const assignments = this.scheduleFor.reduce((acc, user) => {
      acc[user] = [];
      return acc;
    }, {} as Record<TUser, TThing[]>);

    // Shuffle things to ensure fair distribution in case things.length < users.length.
    // And then also loop it to ensure we don't assign an `undefined` value when
    // users.length > things.length.
    const shuffledActivities = this.#shuffle(this.activities, "activities");
    console.debug(`Shuffled activities: ${shuffledActivities}`);

    const loopedShuffledActivities = new LoopedList(shuffledActivities);

    const shuffledScheduleFor = this.#shuffle(this.scheduleFor, "scheduleFor");
    console.debug(`Shuffled scheduleFor: ${shuffledScheduleFor}`);

    this.#shuffle(this.scheduleFor, "scheduleFor").forEach((user, i) => {
      assignments[user].push(loopedShuffledActivities.get(i));
    });

    console.debug("Generated assignments", {
      seedKey: this.seedKey,
      assignments,
    });

    return assignments;
  }

  #shuffle<T extends string>(items: readonly T[], itemsSeedKey: string): T[] {
    return [...items]
      .map((item, i) => {
        const compositeSeed = [
          this.seedKey,
          itemsSeedKey,
          generateWeeklySeed(this.weekOffset),
          i,
        ];

        const orderWeight = randomWithSeed(...compositeSeed);

        console.debug("Generated orderWeight for item", {
          item,
          generatorSeedKey: this.seedKey,
          compositeSeed,
          orderWeight,
        });

        return {
          item,
          orderWeight,
        };
      })
      .sort((a, b) => a.orderWeight - b.orderWeight)
      .map(({ item }) => item);
  }
}
