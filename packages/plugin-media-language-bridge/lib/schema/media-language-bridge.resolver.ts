import { Query, Resolver } from "type-graphql";

/** Minimal resolver required by Riven's plugin contract; no secret is exposed. */
@Resolver()
export class MediaLanguageBridgeResolver {
  @Query(() => Boolean)
  public mediaLanguageBridgeIsEnabled(): boolean {
    return true;
  }
}
