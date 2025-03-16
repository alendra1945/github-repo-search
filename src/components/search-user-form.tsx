import { Input } from "@/components/ui/input";
import { SearchIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchGithubUser, ActionType } from "@/hooks/use-user-query";
import { IconSearchPage } from "@/components/icons";
import TypingText from "@/components/typing-text";
import { motion } from "framer-motion";
import { testId } from "@/lib/test-id";
export default function SearchUserForm() {
  const { form, onSubmit, actionType } = useSearchGithubUser();
  const onGetUser = actionType == ActionType.GET_USER;

  return (
    <motion.div className="relative flex flex-col w-full px-10 gap-y-10 mt-auto transition duration-700 bg-white/10 backdrop-blur-[2px]">
      <IconSearchPage className="absolute -top-14 left-1/2 -translate-x-1/2 -translate-y-[100%] w-[300px] opacity-80 h-[200px] max-w-sm mx-auto" />
      <TypingText
        text="Stay Updates for User Repository!!"
        className="text-2xl max-w-sm font-semibold"
        repeat={false}
      ></TypingText>
      <form
        className="group relative w-full max-w-lg"
        onSubmit={onSubmit}
        {...testId("form-user-search")}
      >
        <Input
          className="pr-[120px] h-14 bg-white focus-visible:ring-transparent"
          {...form.register("search")}
          placeholder="who are you looking for?"
          disabled={onGetUser}
          {...testId("input-user-search")}
        />
        {form.getValues("search") && (
          <Button
            type="button"
            className="absolute right-[105px] top-1/2 -translate-y-1/2 size-6 [&_svg]:size-4"
            variant="ghost"
            size="icon"
            onClick={() => form.setValue("search", "")}
          >
            <XIcon />
          </Button>
        )}

        <Button
          disabled={onGetUser}
          className="absolute right-0 top-0 cursor-pointer h-full rounded-l-none font-bold text-base bg-[#167364] hover:bg-[#167364] w-[100px]"
        >
          <SearchIcon className="translate-x-[500px] absolute group-hover:translate-x-0 size-6 transition duration-300" />
          <span className="translate-x-0 group-hover:translate-x-[500px] transition duration-300">
            Find
          </span>
        </Button>
      </form>
    </motion.div>
  );
}
