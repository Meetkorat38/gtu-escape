import { CommunityPage } from "@/components/CommunityPage";
import Footer from "@/components/Footer";
import Wrapper from "@/components/Wrapper";

const Community = () => {
  return (
    <>
      <Wrapper className="dark:bg-gray-900">
        <CommunityPage />
      </Wrapper>
      <Footer />
    </>
  );
};

export default Community;
