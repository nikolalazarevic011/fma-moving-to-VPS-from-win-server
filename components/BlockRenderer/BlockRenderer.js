import { AcfCustomHtml } from "components/AcfCustomHtml";
import { AcfImage } from "components/AcfImage";
import AcfSlider from "components/AcfSlider/AcfSlider";
import { CallToActionButton } from "components/CallToActionButton";
import { Column } from "components/Column";
import { Columns } from "components/Columns";
import { Cover } from "components/Cover";
import { Details } from "components/Details";
import { Gallery } from "components/Gallery/Gallery";
import { Group } from "components/Group/Group";
import { Heading } from "components/Heading";
import { List } from "components/List";
import Media_text from "components/Media_text/Media_text";
import { Paragraph } from "components/Paragraph";
import { AcfVideo } from "components/acfVideo";
import Image from "next/image";
import { theme } from "theme";
import { getBorderBottomWidthClass, getBorderColorClass } from "utils/border";
import { getPaddingBottomClass } from "utils/padding";

export const BlockRenderer = ({ blocks }) => {
  if (!Array.isArray(blocks)) {
    // console.error('BlockRenderer error: `blocks` is not an array', blocks);
    return null; // Or a fallback UI
  }
  return blocks.map((block) => {
    switch (block.name) {
      case "core/block": {
        return <BlockRenderer key={block.id} blocks={block.innerBlocks} />;
      }
      case "core/group": {
        const { style } = block.attributes;
        const flexClass =
          block.attributes?.layout?.orientation === "horizontal"
            ? "flex-row"
            : "flex-col";

        // Extract padding and border styles correctly based on your JSON structure
        const paddingBottom = style?.spacing?.padding?.bottom;
        const borderBottomWidth = style?.border?.bottom?.width;
        const bottomBorderColor = style?.border?.bottom?.color;

        return (
          <Group
            key={block.id}
            className={`flex ${flexClass} items-center ${getPaddingBottomClass(paddingBottom)} ${getBorderBottomWidthClass(borderBottomWidth)} ${getBorderColorClass(bottomBorderColor)}`}
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </Group>
        );
      }

      case "core/image": {
        // console.log(block.attributes.height);
        return (
          <div className="" key={block.id}>
            <Image
              src={block.attributes.url}
              height={block.attributes.height || 'auto'}
              width={block.attributes.width || 'auto'}
              alt={block.attributes.alt || ""}
              priority
            />
          </div>
        );
      }
      case "acf/acfimage": {
        //more props inside
        return <AcfImage block={block} key={block.id} />;
      }
      case "core/media-text": {
        //more props inside
        return (
          <Media_text
            key={block.id}
            block={block}
            innerBlocks={block.innerBlocks}
            mediaPosition={block.attributes.mediaPosition}
            mediaLink={block.attributes.mediaLink}
            verticalAlignment={block.attributes.verticalAlignment}
            height={block.attributes.height}
            width={block.attributes.width}
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </Media_text>
        );
      }
      case "core/post-title": {
        return (
          <Heading //one of two
            key={block.id}
            level={block.attributes.level}
            textAlign={block.attributes.textAlign}
            content={block.attributes.content}
          />
        );
      }
      case "core/heading": {
        return (
          <Heading
            key={block.id}
            level={block.attributes.level}
            textAlign={block.attributes.textAlign}
            content={block.attributes.content}
            color={
              block.attributes.textColor || block.attributes.style?.color?.text
            }
            marginBottom={block.attributes.style?.spacing?.margin?.bottom}
          />
        );
      }
      case "core/cover": {
        return (
          <Cover
            key={block.id}
            id={block.id}
            background={block.attributes.url}
            overlay={block.attributes.overlayColor}
            mobileHeight={block.attributes.layout.contentSize}
            desktopHeight={block.attributes.layout.wideSize}
            hasParallax={block.attributes.hasParallax}
            borderBottomWidth={block.attributes.style?.border?.bottom?.width}
            bottomBorderColor={block.attributes.style?.border?.bottom?.color}
            fullWidth={block.attributes?.width == 1500 && block.attributes?.height ==700}
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </Cover>
        );
      }
      case "core/buttons": {
        return <BlockRenderer key={block.id} blocks={block.innerBlocks} />;
      }
      case "core/paragraph": {
        return (
          <Paragraph
            key={block.id}
            textAlign={block.attributes.textAlign}
            content={block.attributes.content}
            textColor={
              theme[block.attributes.textColor] ||
              block.attributes.style?.color?.text
            }
          />
        );
      }
      case "core/list": {
        return (
          <List items={block.innerBlocks}>
            <BlockRenderer key={block.id} blocks={block.innerBlocks} />
          </List>
        );
      }
      case "core/columns": {
        console.log("COLUMNS: ", block.attributes);
        return (
          <Columns
            key={block.id}
            isStackedOnMobile={block.attributes?.isStackedOnMobile}
            textColor={
              theme[block.attributes?.textColor] ||
              block.attributes.style?.color?.text
            }
            backgroundColor={
              theme[block.attributes?.backgroundColor] ||
              block.attributes.style?.color?.background
            }
            marginTop={block.attributes.style?.spacing?.margin?.top} //?! RADI NEGO SI GLEDAO U COLUMn umesto columns
            marginBottom={block.attributes.style?.spacing?.margin?.bottom} //?! RADI NEGO SI GLEDAO U COLUMn umesto columns
            verticalAlignment={block.attributes?.verticalAlignment}
            // spacing={block.attributes.style?.spacing} // kad napravis util klasu da samo paste spacing a ona odradi sve
            borderWidth={block.attributes?.style?.border?.width}
            borderRadius={block.attributes?.style?.border?.radius}
            borderColor={block.attributes?.borderColor}
            minHeight={block.attributes?.style?.spacing?.blockGap?.top} //double check
            horizontalGap={block.attributes?.style?.spacing?.blockGap?.left} 
            verticalGap={block.attributes?.style?.spacing?.blockGap?.top} 
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </Columns>
        );
      }
      case "core/gallery": {
        return (
          <Gallery
            key={block.id}
            columns={block.attributes.columns || 3}
            cropImages={block.attributes.imageCrop}
            items={block.innerBlocks}
          />
        );
      }
      case "core/column": {
        return (
          <Column
            key={block.id}
            width={block.attributes.width}
            textColor={
              theme[block.attributes.textColor] ||
              block.attributes.style?.color?.text
            }
            backgroundColor={
              theme[block.attributes.backgroundColor] ||
              block.attributes.style?.color?.background
            }
            borderBottom={block.attributes.style?.border?.bottom?.width}
            borderBottomColor={block.attributes.style?.border?.bottom?.color}
            minHeight={block.attributes?.style?.spacing?.blockGap}
            shadow={block.attributes?.style?.shadow}
            borderRadius={block.attributes?.style?.border?.radius}
            isHidden={block.attributes?.className == 'hide'}
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </Column>
        );
      }
      case "core/details": {
        const headBlock = block.innerBlocks.find(
          (b) => b.name === "core/heading",
        );
        const paraBlocks = block.innerBlocks.filter(
          (b) => b.name === "core/paragraph",
        ); // Collect all paragraph blocks

        return (
          <Details
            key={block.id}
            headTitle={headBlock?.attributes.content}
            headLevel={headBlock?.attributes.level}
            headColor={headBlock?.attributes.textColor}
            paraBlocks={paraBlocks} // Pass all paragraphs as an array
          />
        );
      }

      case "acf/ctabutton": {
        return (
          <CallToActionButton
            key={block.id}
            buttonLabel={block.attributes.data.label}
            destination={block.attributes?.data?.destination}
            align={block.attributes.data.align}
            color={block.attributes.data?.color}
            url={block.attributes.data?.external_url?.url}
            transparency={block.attributes.data?.transparent_button}
            openInNewTab={block.attributes.data?.external_url?.target}
          />
        );
      }
      case "acf/acfcustomhtml": {
        return (
          <AcfCustomHtml
            key={block.id}
            //? src or customHtml
            customHtml={block.attributes?.data?.custom_html}
            src={"https://form.jotform.com/71946782144969"}
          />
        );
      }
      case "acf/acfvideo": {
        // console.log("acf video block:", block);
        return (
          <AcfVideo
            key={block.id}
            src={block.attributes.data.url}
            isEmbed={block.attributes.data.is_url_embed}
            heightProp={block.attributes.data.height}
            controls={block.attributes.data.show_controls}
            autoplay={block.attributes.data.autoplay}
          />
        );
      }
      case "acf/acfslider": {
        // console.log(block.attributes.data);
        return <AcfSlider key={block.id} images={block.attributes.data} />;
      }
      default: {
        console.log("UNKNOWN:", block);
        return null;
      }
    }
  });
};
