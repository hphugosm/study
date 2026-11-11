/**
 * Separately reviewed public assignment content; never import private scan bodies.
 * Each record is bound to {assignmentId: approved feed ID, version: feed version,
 * subject, topic, reviewed:true, reviewed_on:'YYYY-MM-DD', prompt,
 * steps?: string[], solution?: {paragraphs?:string[],steps?:string[]},
 * solutions?: course-notes solution[],
 * source_refs: actual approved public document ID/SHA references}.
 * Prompt-only / text-only solutions may have source_refs:[]: the reviewed exact
 * assignment ID + version is their provenance, never a fabricated file hash.
 * A changed feed version requires a fresh review. References must belong to the
 * exact topic's published materials. An assignment version is not a file SHA.
 */
export const reviewedAssignmentContent=Object.freeze([]);
