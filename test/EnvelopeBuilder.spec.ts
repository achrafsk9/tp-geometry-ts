import { describe, it, expect } from "vitest";
import Envelope from "../src/Envelope";
import EnvelopeBuilder from "../src/EnvelopeBuilder";

describe("0.5 - Envelope et EnvelopeBuilder", () => {

  it("should create an Envelope", () => {
    const envelope = new Envelope(0, 1, 2, 3);

    expect(envelope.toString()).toBe("[0,1,2,3]");
  });

  it("should build an envelope from one point", () => {
    const builder = new EnvelopeBuilder();

    builder.insert([3, 4]);

    expect(builder.build().toString())
      .toBe("[3,4,3,4]");
  });

  it("should build an envelope from multiple points", () => {
    const builder = new EnvelopeBuilder();

    builder.insert([0, 1]);
    builder.insert([2, 0]);
    builder.insert([1, 3]);

    const envelope = builder.build();

    expect(envelope.toString()).toBe("[0,0,2,3]");
  });

  it("should handle negative coordinates", () => {
    const builder = new EnvelopeBuilder();

    builder.insert([-5, -2]);
    builder.insert([3, 4]);
    builder.insert([-1, 7]);

    expect(builder.build().toString())
      .toBe("[-5,-2,3,7]");
  });

  it("should handle identical coordinates", () => {
    const builder = new EnvelopeBuilder();

    builder.insert([2, 3]);
    builder.insert([2, 3]);

    expect(builder.build().toString())
      .toBe("[2,3,2,3]");
  });

  it("should handle an empty builder", () => {
    const builder = new EnvelopeBuilder();

    const envelope = builder.build();

    expect(envelope.toString())
      .toBe("[NaN,NaN,NaN,NaN]");
  });

  it("should ignore empty coordinates", () => {
    const builder = new EnvelopeBuilder();

    builder.insert([]);
    builder.insert([1]);
    builder.insert([2, 5]);

    expect(builder.build().toString())
      .toBe("[2,5,2,5]");
  });

});
