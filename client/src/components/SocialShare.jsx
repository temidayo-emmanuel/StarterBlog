import React from 'react';
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    LinkedinShareButton,
    FacebookIcon,
    XIcon,
    WhatsappIcon,
    LinkedinIcon,
} from 'react-share';

const SocialShare = ({ post }) => {
    const shareUrl = `${window.location.origin}/posts/${post._id}`;
    const title = post.title;

    return (
        <div style={{ display: 'flex', gap: '14px', marginTop: '10px' }}>
            <FacebookShareButton url={shareUrl} quote={title}>
                <FacebookIcon size={30} round />
            </FacebookShareButton>

            <TwitterShareButton url={shareUrl} title={title}>
                <XIcon size={30} round />
            </TwitterShareButton>

            <WhatsappShareButton url={shareUrl} title={title}>
                <WhatsappIcon size={30} round />
            </WhatsappShareButton>

            <LinkedinShareButton url={shareUrl} title={title}>
                <LinkedinIcon size={30} round />
            </LinkedinShareButton>
        </div>
    );
};

export default SocialShare;